const SELECTORS = {
  // Landing page
  proceedToLogin: 'a.btn-keycloak',

  // Keycloak login form
  usernameInput: 'input#username',
  passwordInput: 'input#password',
  signInBtn: 'button#kc-login',
  loginError: 'p#input-error-username',

  // Desk page
  dreamLinkApp: 'a[data-id="DreamLink"]',

// Shared desk list-view selectors
  deskListRow: '.list-row-container[tabindex="1"]',
  deskLoadingIndicator: '.freeze.flex.justify-center.align-center.text-muted',
  deskNoResultsMessage: 'div.no-result.text-muted p',

// DreamSave Groups list page
  loggedInUser: 'span.d-block.text-truncate:not(.text-secondary)',
  groupsPageTitle: 'a.title-text[title="DreamSave Groups"]',
  recordCount: '.list-count span',
  groupNameLink: 'a.ellipsis[data-doctype="DL DreamSave Group"]',
  groupSearchInput: 'input[data-fieldname="group_name"]',

  // DreamSave Group detail page
  groupNameDetail: '[data-fieldname="group_name"] .control-value.like-disabled-input',

  // Logout
logoutMenuTrigger: 'a.sidebar-header',
logoutMenuItem: 'span.menu-item-title',
logoutConfirmBtn: 'button.btn.btn-primary.btn-sm.btn-modal-primary',


  // Users list page
  usersPageTitle: 'a.title-text[title="Users"]',
  usersNavLink: 'a.item-anchor[href="/desk/dl-user"]',
  userNameLink: 'a.ellipsis[data-doctype="DL User"]',
  userSearchInput: 'input[data-fieldname="name"]',

  // User detail page
  userFullName: '[data-fieldname="full_name"] .control-value.like-disabled-input',

  // User Profile page
userProfileMenuBtn: '[aria-label="User Menu"]',
userProfilePageTitle: '#page-DL\\ User\\ Profile .title-text-form',
userProfileFullName: '#body',

// Eligibility Criteria page
eligibilityCriteriaPageTitle: 'a.title-text[title="Eligibility Criteria"]',
eligibilityCriteriaNavLink: 'a.item-anchor[href="/desk/eligibility-criteria"]',
eligibilityCriteriaRow: 'div[class*="border-row-border"]',

// Criterion detail page
criterionAttribute: 'section.pt-5 dd.text-foreground',
criterionGroupType: 'section.border-border dd.text-foreground',
criterionNameLink: 'a[data-discover="true"]',
criteriaSearchInput: 'input[placeholder="Search by criterion name"]',
criteriaNoResultsMessage: 'p.text-foreground.text-base',

// Add Criterion form
createCriterionBtn: 'button[data-label="Create Criterion"]',
criterionNameInput: 'Criterion name *',
criterionDescriptionInput: 'Description *',
saveCriterionBtn: 'Save criterion',
criterionSuccessToast: 'div.alert.desk-alert.green .alert-message',

// Eligibility Criteria Sets
criteriaSetRow: 'div[class*="border-row-border"][class*="text-muted-foreground"]',
criteriaSetsTab: 'a[href="/sets"][data-discover="true"]',
createCriteriaSetBtn: 'button[data-label="Create Criteria Set"]',
criteriaSetNameInput: 'input#criteria-set-name',
criteriaSetCheckbox: 'input.dl-checkbox',
saveCriteriaSetBtn: 'button:has-text("Save criteria set")',
criteriaSetSuccessToast: 'div.alert.desk-alert.green .alert-message-container',
criteriaSetSearchInput: 'input[placeholder="Search by set name"]',
criteriaSetNoResultsMessage: 'p.text-foreground.text-base',

// Products list page
productsPageTitle: 'a.title-text[title="Product"]',
productsNavLink: 'a.item-anchor[href="/desk/dl-product"]',

// Classification — list-view actions
classificationActionsBtn: 'div.actions-btn-group button[data-toggle="dropdown"]',
classificationRunMenuItem: 'span.menu-item-label[data-label="Run%20Classification"]',

// Run Classification confirmation modal
classificationConfirmBtn: '.modal.fade.show .modal-footer button.btn-modal-primary',

// Classification Summary modal
classificationSummaryPill: '.modal.fade.show span.indicator-pill.orange',
classificationSummaryText: 'No Groups Classified',
classificationSummaryCloseBtn: '.modal.fade.show .modal-footer button.btn-modal-primary',
classificationModalBackdrop: '.modal.fade.show',

// Classification Summary modal — fully eligible (green)
classificationSummaryPillGreen: '.modal.fade.show span.indicator-pill.green',
classificationSummaryTextGreen: 'Classification triggered for 1 group across 1 product',

// Groups list — fully eligible badge
fullyEligibleBadge: 'span.badge.badge-success[title="Fully Eligible"]',

// Leads list page
leadsPageTitle: 'a.title-text[title="Lead"]',
leadSavingGroupSearchInput: 'input[data-fieldname="dl_saving_group"]',
leadNameLink: 'a.ellipsis[data-doctype="DL Lead"]',

// Lead detail page
leadNumber: '[data-fieldname="lead_number"] .control-value.like-disabled-input',
leadGeneratedDate: '[data-fieldname="generated_date"] .control-value.like-disabled-input',
leadSavingGroupValue: '[data-fieldname="dl_saving_group"] .control-value.like-disabled-input',
leadTaskStatusPill: 'span.indicator-pill.purple',
// Lead detail — tasks section
leadTasksGroupHead: 'div.dl-tasks-group-head',
leadTasksStagePill: 'div.dl-tasks-group-head span.indicator-pill.cyan',
leadTasksCountLabel: 'div.dl-tasks-group-head span.text-muted.small',

// Leads list — active status pill
leadActiveStatusPill: 'span.filterable.indicator-pill.green.ellipsis',
// Leads list — number search
leadNumberSearchInput: 'input[data-fieldname="lead_number"]',
leadsNoResultsMessage: 'div.no-result p',

// Autocomplete dropdown
autocompleteListbox: 'ul[role="listbox"]:not([hidden])',
autocompleteDropdownOption: '[role="option"]',

// Groups list — data correction badge
dataCorrectionalBadge: 'span.badge.badge-secondary[title="Data Correction Required"]',

// Pre Leads list page
preLeadsPageTitle: 'a.title-text[title="Pre Lead"]',
preLeadsNavLink: 'a.item-anchor[href="/desk/dl-pre-lead"]',
preLeadSavingGroupSearchInput: 'input[data-fieldname="dl_saving_group"]',
preLeadNameLink: 'a.ellipsis[data-doctype="DL Pre Lead"]',

// Pre Lead detail page
preLeadNumber: '[data-fieldname="pre_lead_number"] .control-value.like-disabled-input',
preLeadGeneratedDate: '[data-fieldname="generated_date"] .control-value.like-disabled-input',
preLeadSavingGroupValue: '[data-fieldname="dl_saving_group"] .control-value.like-disabled-input',
preLeadTasksStagePill: 'div.dl-tasks-group-head span.indicator-pill.blue',
preLeadTasksCountLabel: 'div.dl-tasks-group-head span.text-muted.small',
preLeadTaskStatusPill: 'span.indicator-pill.purple',
preLeadTasksGrid: 'div.dl-tasks-group div.grid-row',

};

const TIMEOUTS = {
  default: 20000,
  navigation: 30000,
};

const DEFAULTS = {
  pageSize: 20,
};

module.exports = { SELECTORS, TIMEOUTS, DEFAULTS };