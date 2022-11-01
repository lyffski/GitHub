import * as k from '@kaminrunde/storybook-addon-fireside'

export type TrackingConfig = {
  campaignId: string
  name: string
  creative: string
}

export const storyElements = [
  k.string('eecTracking.campaignId', 'Kampagnen-Id', '', {
    tab: 'Advanced-Ecommerce',
  }),
  k.string('eecTracking.name', 'Kampagnen-Name', '', {
    tab: 'Advanced-Ecommerce',
  }),
  k.string('eecTracking.creative', 'Creative', '', {
    tab: 'Advanced-Ecommerce',
  }),
]
