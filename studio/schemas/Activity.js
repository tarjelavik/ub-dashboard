import { coalesceLabel } from './helpers'
import { MdLocalActivity } from 'react-icons/md'
import {
  timespan,
  referredToBy,
  carriedOutBy,
  usedSpecificTechnique,
  usedGeneralTechnique,
  usedSpecificObject,
  tookPlaceAt,
  hadParticipant,
  usedObjectOfType,
  labelSingleton,
  accessState,
  editorialState,
  timespanSingleton,
} from './props'

export default {
  name: 'Activity',
  title: 'Activity',
  type: 'document',
  icon: MdLocalActivity,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'minimum',
      title: 'Basic metadata',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'technique',
      title: 'Felt relatert til teknikk',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'purpose',
      title: 'Formål med aktiviteten',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    editorialState,
    accessState,
    labelSingleton,
    {
      ...referredToBy,
      fieldset: 'minimum',
    },
    {
      name: 'hasType',
      title: 'Aktivitetstype',
      titleEN: 'Activity type',
      type: 'array',
      fieldset: 'minimum',
      of: [
        {
          type: 'reference',
          to: [{ type: 'Concept' }],
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    carriedOutBy,
    hadParticipant,
    {
      name: 'target',
      title: 'Mål',
      titleEN: 'Target',
      type: 'reference',
      to: [
        { type: 'Actor' }
      ],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    timespanSingleton,
    tookPlaceAt,
    {
      name: 'consistsOf',
      title: 'Underaktiviteter',
      titleEN: 'Sub activities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'Activity' }] }],
      options: {
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
    {
      name: 'continued',
      title: 'Fortsatte',
      titleEN: 'Continued',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'Activity' }] }],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'wasContinuedBy',
      title: 'Ble fortsatt av',
      titleEN: 'Was continued by',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'Activity' }] }],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'influencedBy',
      title: 'Påvirket av',
      titleEN: 'Influenced by',
      description: '',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'Event' },
            { type: 'Place' },
            { type: 'Actor' }
          ],
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'generalPurpose',
      title: 'Generelt formål',
      titleEN: 'General purpose',
      description: '',
      fieldset: 'purpose',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'Concept' }],
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    {
      name: 'motivatedBy',
      title: 'Motivert av',
      titleEN: 'Motivated by',
      description: '',
      fieldset: 'purpose',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'Event' },
            { type: 'Project' },
          ],
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
      edtf: 'timespan.edtf',
      type: 'hasType.0.label',
    },
    prepare(selection) {
      const { title, type, edtf } = selection

      return {
        title: title,
        subtitle: `${coalesceLabel(type)} ${edtf}`,
      }
    },
  },
}
