describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу: localhost:4000', function () {
    cy.visit('/');
  });

  function cypressAttribute(name: string) {
    return `[data-cy="${name}"]`;
  }

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', (req) => {
      req.reply({
        fixture: 'ingredients.json'
      });
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');

    cy.visit('/');
  });

  afterEach(() => {
    cy.setCookie('accessToken', '');
    localStorage.setItem('refreshToken', '');
  });

  describe('Тестирование работы модальных окон', () => {
    beforeEach(() => {
      cy.get(cypressAttribute('ingredients-category'))
        .find('li')
        .first()
        .click();
    });

    it('Проверка открытия модального окна ингредиента', () => {
      cy.get(cypressAttribute('modal')).should('be.visible');
      cy.contains('Детали ингредиента').should('exist');
    });

    describe('Закрытие модального окна:', () => {
      it('Проверка закрытие по клику на крестик', () => {
        cy.get(cypressAttribute('modal-close-button')).click();
        cy.get(cypressAttribute('modal')).should('not.exist');
      });
      it('Проверка закрытия модального окна - esc', () => {
        cy.get('body').type('{esc}');
        cy.get(cypressAttribute('modal')).should('not.exist');
      });
    });

    it('Проверка открытия с описанием модального окна', () => {
      cy.get(cypressAttribute('modal-close-button')).should('exist');
      cy.get(cypressAttribute('ingredient-image')).should('be.visible');
      cy.get(cypressAttribute('ingredient-name')).should('not.be.empty');
      cy.get('li')
        .children('p')
        .contains('Калории, ккал')
        .next('p')
        .should('not.be.empty');
      cy.get('li')
        .children('p')
        .contains('Белки, г')
        .next('p')
        .should('not.be.empty');
      cy.get('li')
        .children('p')
        .contains('Жиры, г')
        .next('p')
        .should('not.be.empty');
      cy.get('li')
        .children('p')
        .contains('Углеводы, г')
        .next('p')
        .should('not.be.empty');
    });
  });

  describe('Процесс создания заказа', () => {
    describe('Добавление ингредиента из списка в конструктор', () => {
      it('Добавление булки (bun)', () => {
        const btnAddBun = cy
          .get('h3')
          .contains('Булки')
          .next('ul')
          .contains('Добавить');
        btnAddBun.click();
        cy.get('div').contains('Выберите булки').should('not.exist');
      });

      it('Добавление ингредиентов (main / sauce)', () => {
        const btnAddMain = cy
          .get('h3')
          .contains('Начинки')
          .next('ul')
          .contains('Добавить');
        const btnAddSauce = cy
          .get('h3')
          .contains('Соусы')
          .next('ul')
          .contains('Добавить');
        btnAddMain.click();
        btnAddSauce.click();
        cy.get('div').contains('Выберите начинку').should('not.exist');
      });
    });

    it('Проверка наличия пользователя', () => {
      cy.contains('John Lennon').should('exist');
    });

    it('Проверка оформления заказа', () => {
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      }).as('postOrders');

      cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
      cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
      cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
      cy.contains('Оформить заказ').click();
      cy.contains('64164').should('exist');
      cy.get(cypressAttribute('modal-close-button'))
        .first()
        .click({ force: true });
      cy.get(cypressAttribute('modal')).should('not.exist');
      cy.contains('64164').should('not.exist');
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
      cy.contains('John Lennon').should('not.exist');
    });
  });
});
