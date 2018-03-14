import { Module } from 'cerebral'
import domainRouted from './signals/domainRouted'
import newDomainRouted from './signals/newDomainRouted'
import domainFormSubmitted from './signals/domainFormSubmitted'
import fieldChanged from './signals/fieldChanged'
import deleteDomainClicked from './signals/deleteDomainClicked'
import deleteDomainConfirmed from './signals/deleteDomainConfirmed'
import deleteDomainCanceled from './signals/deleteDomainCanceled'

export default options =>
  Module({
    state: {
      isLoading: false,
      selectedDomainId: null,
      domainForm: {
        id: {},
        domain: {
          value: '',
          isRequired: true,
          validationRules: [/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/]
        },
        domainAvailability: {
          value: false,
          validationRules: ['isTrue']
        }
      },
      showConfirmDelete: false,
      data: {}
    },
    signals: {
      domainRouted,
      newDomainRouted,
      fieldChanged,
      domainFormSubmitted,
      deleteDomainClicked,
      deleteDomainConfirmed,
      deleteDomainCanceled
    }
  })
