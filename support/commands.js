// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password).type('{enter}');
  });

  Cypress.Commands.add('fillRegistrationForm', () => {
    cy.get('#name').type('test')
    cy.get('#email').type('correo@correo.com')
    cy.get('#pwd').type('Admin123$')
    cy.get('#pwdRepeat').type('Admin123$')
  })

  Cypress.Commands.add('fillLoginForm', () => {
    cy.get('#ingresoUsuario').type('test@prueba.com')
    cy.get('#ingresoContrasena').type('Admin123$')
  })


//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })