module.exports = function fruitBasket(pool) {

    async function insertFruits(fruit_name,price, qty) {
       
            await pool.query('insert into fruit_basket (fruit_name,price,quantity) values ($1,$2,$3)',[fruit_name,price,qty]);

        
    }
    async function UpdateFruits(fruit_name, qty){
        fruit1 = await pool.query(`update fruit_basket set quantity = quantity+ $2 where fruit_name = $1`,[fruit_name, qty]);

    }
    async function findAllFruits(){
        var allFuits = await pool.query('select fruit_name,price, quantity from fruit_basket');
        return allFuits.rows 

    }

    async function showTotal(fruit_name){
        var total = await pool.query('select sum(price * quantity) from fruit_basket where fruit_name = $1',[fruit_name]);
        return total.rows
    }

    async function showTotalForType(fruit_name){
        var totalPrice = await pool.query('select count(*) from fruit_basket where fruit_name = $1',[fruit_name]);
        return totalPrice.rows
    }

   return {
        fruitBasket,
        showTotal,
        insertFruits,
        UpdateFruits,
        findAllFruits,
        showTotalForType

    }

}

