import ConfirmationPage from "./ConfirmationPage";
class CartPage
{
    verifyCartItems()
    {
       return cy.get("tr td h3 strong").then(($elements) => {
            let total = 0;
            $elements.each((index, element) => {
                total += Number(element.innerText.split(" ")[1].trim());
            });
            return total;
        });
    }

    verifySumOfItems()
    {
        let sum = 0;
        return cy.get("tr td:nth-child(4) strong").each(($el) => {
            const amount = Number($el.text().split(" ")[1].trim());
            sum += amount;
        }).then(() => {
            return sum;
        });
    }

    proceedToCheckout()
    {
        cy.contains("button", "Checkout").click();
        return new ConfirmationPage();
    }
}
export default CartPage;