'use strict';

/**
 * training controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::training.training', ({ strapi }) => ({
  /**
   * DELETE /trainings/:id
   *
   * Cascade delete — removes all player-progress entries tied to this
   * training before deleting the training itself. Runs in a single
   * transaction so partial failures roll back.
   */
  async delete(ctx) {
    const { id: trainingDocumentId } = ctx.params;

    try {
      const result = await strapi.db.transaction(async () => {
        const progressEntries = await strapi
          .documents('api::player-progress.player-progress')
          .findMany({
            filters: { training: { documentId: trainingDocumentId } },
          });

        for (const entry of progressEntries) {
          await strapi
            .documents('api::player-progress.player-progress')
            .delete({ documentId: entry.documentId });
        }

        const deletedTraining = await strapi
          .documents('api::training.training')
          .delete({ documentId: trainingDocumentId });

        return {
          training: deletedTraining,
          deletedProgressCount: progressEntries.length,
        };
      });

      ctx.body = {
        data: {
          deletedProgressCount: result.deletedProgressCount,
        },
      };
    } catch (err) {
      strapi.log.error('training.delete cascade failed', err);
      return ctx.internalServerError(err.message || 'Failed to delete training');
    }
  },

  /**
   * POST /trainings/:id/complete
   *
   * Atomically marks a training as completed and creates player-progress
   * entries for each player (one entry per player with all completed
   * exercises + points earned).
   *
   * Body:
   *   {
   *     actualDuration: number,          // seconds
   *     playerProgressData: [
   *       {
   *         playerId: string,            // documentId
   *         completedExerciseIds: string[],
   *         pointsEarned: number,
   *       },
   *       ...
   *     ]
   *   }
   */
  async complete(ctx) {
    const { id: trainingDocumentId } = ctx.params;
    const { actualDuration, playerProgressData } = ctx.request.body || {};

    if (!Array.isArray(playerProgressData)) {
      return ctx.badRequest('playerProgressData must be an array');
    }

    const completedAt = new Date().toISOString();

    try {
      const result = await strapi.db.transaction(async () => {
        const updatedTraining = await strapi.documents('api::training.training').update({
          documentId: trainingDocumentId,
          data: {
            training_status: 'completed',
            completedAt,
            actualDuration: actualDuration ?? null,
          },
        });

        const progressEntries = [];
        for (const p of playerProgressData) {
          const entry = await strapi.documents('api::player-progress.player-progress').create({
            data: {
              player: { connect: [{ documentId: p.playerId }] },
              training: { connect: [{ documentId: trainingDocumentId }] },
              exercises: {
                connect: (p.completedExerciseIds || []).map((documentId) => ({ documentId })),
              },
              pointsEarned: p.pointsEarned ?? 0,
              completedAt,
            },
          });
          progressEntries.push(entry);
        }

        return { training: updatedTraining, progressEntries };
      });

      ctx.body = {
        data: {
          training: result.training,
          progressCount: result.progressEntries.length,
        },
      };
    } catch (err) {
      strapi.log.error('training.complete failed', err);
      return ctx.internalServerError(err.message || 'Failed to complete training');
    }
  },
}));
