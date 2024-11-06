import type { Schema, Struct } from '@strapi/strapi';

export interface BattlebookBattlebook extends Struct.ComponentSchema {
  collectionName: 'components_battlebook_battlebooks';
  info: {
    description: '';
    displayName: 'Player';
    icon: 'rocket';
  };
  attributes: {
    Name: Schema.Attribute.String;
    Note: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    opponent: Schema.Attribute.Relation<'oneToOne', 'api::opponent.opponent'>;
  };
}

export interface IrreStep extends Struct.ComponentSchema {
  collectionName: 'components_irre_steps';
  info: {
    displayName: 'Step';
    icon: 'walk';
  };
  attributes: {
    Description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    Image: Schema.Attribute.Media<'images' | 'files'>;
    Name: Schema.Attribute.String;
  };
}

export interface MaterialRacket extends Struct.ComponentSchema {
  collectionName: 'components_material_rackets';
  info: {
    displayName: 'Racket';
    icon: 'chartBubble';
  };
  attributes: {
    Racket: Schema.Attribute.String;
    Rubberback: Schema.Attribute.String;
    Rubberfront: Schema.Attribute.String;
  };
}

export interface PlayerlogCompetition extends Struct.ComponentSchema {
  collectionName: 'components_playerlog_competitions';
  info: {
    description: '';
    displayName: 'Competition';
    icon: 'collapse';
  };
  attributes: {
    Date: Schema.Attribute.Date;
    Name: Schema.Attribute.String;
    Note: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
  };
}

export interface PlayerlogManualNote extends Struct.ComponentSchema {
  collectionName: 'components_playerlog_manual_notes';
  info: {
    displayName: 'Manual Note';
    icon: 'cloud';
  };
  attributes: {
    Date: Schema.Attribute.Date;
    Note: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
  };
}

export interface PlayerlogTrainertable extends Struct.ComponentSchema {
  collectionName: 'components_playerlog_trainertables';
  info: {
    description: '';
    displayName: 'Trainertable';
    icon: 'alien';
  };
  attributes: {
    Date: Schema.Attribute.Date;
    needfocusareas: Schema.Attribute.Relation<
      'oneToMany',
      'api::focusarea.focusarea'
    >;
    Note: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    workedonfocusareas: Schema.Attribute.Relation<
      'oneToMany',
      'api::focusarea.focusarea'
    >;
  };
}

export interface PlayerlogTrainingscamp extends Struct.ComponentSchema {
  collectionName: 'components_playerlog_trainingscamps';
  info: {
    description: '';
    displayName: 'Trainingscamp';
    icon: 'command';
  };
  attributes: {
    Date: Schema.Attribute.Date;
    Days: Schema.Attribute.Integer;
    Name: Schema.Attribute.String;
    Note: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'battlebook.battlebook': BattlebookBattlebook;
      'irre.step': IrreStep;
      'material.racket': MaterialRacket;
      'playerlog.competition': PlayerlogCompetition;
      'playerlog.manual-note': PlayerlogManualNote;
      'playerlog.trainertable': PlayerlogTrainertable;
      'playerlog.trainingscamp': PlayerlogTrainingscamp;
    }
  }
}
