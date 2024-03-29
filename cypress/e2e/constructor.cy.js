describe("BurgerConstructor", () => {
  const testUserData = {
    mail: "pentagon797@ya.ru",
    password: "12345678",
  };

  const craterBun = 'Краторная булка';
  const closeButtonSelector = 'div[aria-label="Закрыть окно"]';

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.on("uncaught:exception", () => {
      return false;
    });
  });

  it("opens and closes modal of selected ingredient", () => {
    cy.contains(craterBun).click();
    cy.get(closeButtonSelector);
    cy.contains("Детали ингредиента");
    cy.get(closeButtonSelector).click();
  });

  it("shows ingredient info modal", () => {
    cy.contains(craterBun).click();
    cy.get("#modals").contains(craterBun);
    cy.get(closeButtonSelector).click();
  });

  it("allows drag and drop of ingredients", () => {
    cy.contains(craterBun).trigger("dragstart");
    cy.contains("Выберите булку")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop");
  });

  it("opens order modal, logs in user, and places order with drag and drop of ingredients", () => {
    cy.contains(craterBun).trigger("dragstart");
    cy.contains("Выберите булку")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop");

    cy.contains("Соус фирменный Space Sauce").trigger("dragstart");
    cy.contains("Выберите начинку")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop");

    cy.contains("Оформить заказ").click();

    cy.contains("Вход");
    cy.get("input").first().type(testUserData.mail);
    cy.get("input").last().type(testUserData.password);

    cy.get("button").contains("Войти").click();

    cy.wait(150);

    cy.contains("Оформить заказ").click();

    cy.wait(15000);

    cy.contains("идентификатор заказа");
  });
});
