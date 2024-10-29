import type { Schema, Struct } from '@strapi/strapi';

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

export interface PlayerlogCompetition extends Struct.ComponentSchema {
  collectionName: 'components_playerlog_competitions';
  info: {
    displayName: 'Competition';
    icon: 'collapse';
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
      'irre.step': IrreStep;
      'playerlog.competition': PlayerlogCompetition;
      'playerlog.trainertable': PlayerlogTrainertable;
      'playerlog.trainingscamp': PlayerlogTrainingscamp;
    }
  }
}
