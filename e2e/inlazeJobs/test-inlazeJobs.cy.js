describe('Ingreso exitoso a la página', () => {
  it('Visita la página y verifica el status de respuesta', () => {
    cy.visit('http://199.187.208.16/qa-test/')
    cy.contains('QA-Test')
    cy.request('http://199.187.208.16/qa-test/')
      .then((response) => {
        expect(response.status).to.eq(200)
      }) 
  })
})
describe('Registro de usuario', () => {
  it('Verifica que el nombre ingresado tenga al menos dos caracteres', () => {
    cy.visit('http://199.187.208.16/qa-test/usuarios.php')
    cy.get('#name').type('A')
    cy.get('.btn-block').click()
    cy.contains('El nombre debe tener al menos dos caracteres')
  })
  it('Verifica que el correo electrónico ingresado tenga el formato de un correo electrónico', () => {
    cy.visit('http://199.187.208.16/qa-test/usuarios.php')
    cy.fillRegistrationForm()
    cy.get('#email').clear()
    cy.get('#email').type('prueba')
    cy.get('.btn-block').click()
    cy.get(':nth-child(2) > .invalid-feedback').should('contain', 'El email no tiene el formato correcto')
  })
  it('Verifica que el correo electrónico ingresado no esté registrado previamente', () => {
    cy.visit('http://199.187.208.16/qa-test/usuarios.php')
    cy.fillRegistrationForm()
    cy.get('.btn-block').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('El usuario test fue creado con éxito.')
    })
    cy.visit('http://199.187.208.16/qa-test/usuarios.php')
    cy.fillRegistrationForm()
    cy.get('.btn-block').click()
    cy.contains('El email ya está registrado')
  })
  it('Verifica que la contraseña ingresada tenga al menos 8 caracteres,un caracter especial, una mayusucula y un numero', () => {
    cy.visit('http://199.187.208.16/qa-test/usuarios.php')
    cy.get('#pwd').type('Admin1$')
    cy.get('.btn-block').click()
    cy.get(':nth-child(3) > .invalid-feedback').should('contain', 'La contraseña debe tener al menos 8 caracteres, un caracter especial, una mayusucula y un numero')
  })
    it('Verifica que no se pueda completar el registro con campos vacíos', () => {
      cy.visit('http://199.187.208.16/qa-test/usuarios.php')
      cy.get('.btn-block').click()
      cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Por Favor Digite Su Nombre!')
      cy.get(':nth-child(2) > .invalid-feedback').should('contain', 'Por Favor Digite Su Email!')
      cy.get(':nth-child(3) > .invalid-feedback').should('contain', 'Por Favor Digite Su Contraseña!')
      cy.get(':nth-child(4) > .invalid-feedback').should('contain', 'Por Favor Digite Su Contraseña!')
    })
  it('creacion exitosa de usuario', () => {
    cy.visit('http://199.187.208.16/qa-test/usuarios.php')
    cy.fillRegistrationForm()
    cy.get('.btn-block').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('El usuario test fue creado con éxito.')
    })
  })
})
describe('Pruebas de inicio de sesion', () => {
  it('Verifica que solo se puede iniciar sesión con un email y contraseña registrados previamente', () => {
    cy.visit('http://199.187.208.16/qa-test/index.php')
    cy.get('#ingresoUsuario').type('text')
    cy.get('#ingresoContrasena').type('text')
    cy.get('.btn-block').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Usuario no existe!')
    })
  })
  it('Verificar que no se pueda iniciar sesión con campos vacíos', () => {
    cy.visit('http://199.187.208.16/qa-test/index.php')
    cy.get('.btn-block').click()
    cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Por Favor Digite Su Usuario!')
    cy.get(':nth-child(2) > .invalid-feedback').should('contain', 'Por Favor Digite Su Contraseña!')
  })
  it('verificar visualizacion de nombre en interfaz de dashboard ', () => {
    cy.visit('http://199.187.208.16/qa-test/index.php')
    cy.fillLoginForm()
    cy.get('.btn-block').click()
    cy.contains('test')
  })
  it('cierre de sesion de usuario exitoso', () => {
    cy.visit('http://199.187.208.16/qa-test/index.php')
    cy.fillLoginForm()
    cy.get('.btn-block').click()
    cy.get('.btn').click()
    cy.url().should('eq', 'http://199.187.208.16/qa-test/index.php')
  })
})