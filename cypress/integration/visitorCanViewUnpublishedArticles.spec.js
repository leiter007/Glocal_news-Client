describe('Visitor can view unpublished articles', () => {

  it('by seeing a correct page headline', () => {
    cy.visit('http://localhost:3001')
    cy.contains('Unpublished Articles')
  })
  
  it('by seeing a list of unpublished articles', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles',
      response: 'fixture:list_of_unpublished_articles.json',
      status: 200
    })
    cy.visit('http://localhost:3001')

    let articles = [
      ["#1", "#title_1", "#ingress_1", "#photo_1"],
      ["#2", "#title_2", "#ingress_2", "#photo_2"],
      ["#3", "#title_3", "#ingress_3", "#photo_3"]
    ]

    articles.forEach(article => {
      cy.get(article[0]).within(() => {
        cy.get(article[1]), (article[2])
        cy.get(article[3]).should('have.attr', 'src')
      })
    })
  })

})
