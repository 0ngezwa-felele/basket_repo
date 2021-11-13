const assert = require('assert');
const fruitBasket = require('../basket');
const pg = require("pg");
const { types } = require('util');
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// DB connection string
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruits';

const pool = new Pool({
    connectionString
    // ssl: useSSL
});
const allFruits = fruitBasket(pool);

describe('fruit tests', async function(){
    beforeEach(async function(){
         await pool.query("delete from fruit_basket;");
    });
    it('It should be able to create a new fruit basket for a given fruit type, qty & fruit price', async function() {
        await allFruits.insertFruits('apple', 2, 5)
        assert.deepEqual([
            {
              fruit_name: 'apple',
              price: '2.00',
              quantity: 5
            }
          ]
          ,  await allFruits.findAllFruits());
        
    });

    it('It should be able to find all the fruit baskets for a given fruit type', async function() {
        await allFruits.insertFruits('Orange', 2, 5)

        assert.deepEqual([{
            fruit_name: 'Orange',
            price: '2.00',
            quantity: 5
          }
        ], await allFruits.findAllFruits());

    });

    it('It should be able to update the number of fruits in a given basket', async function() {
        await allFruits.insertFruits('Banana', 3, 6)
        await allFruits.UpdateFruits('Banana',3)
   

        assert.deepEqual(
            [
              {
                fruit_name: 'Banana',
                price: '3.00',
                quantity: 9
              }
            ]
            , await allFruits.findAllFruits());
    });

    it('It Should be able to show the total price for a given fruit basket', async function() {
        await allFruits.insertFruits('Banana', 3, 9)


        assert.deepEqual([{sum: '27.00'}], await allFruits.showTotal('Banana'));
    });

    it('It should be able to show the sum of the total of the fruit baskets for a given fruit type', async function() {
        await allFruits.insertFruits('Banana', 3, 9)
        await allFruits.insertFruits('Banana', 3, 9)
        await allFruits.insertFruits('Banana', 3, 9)
        assert.deepEqual([{count: '3'}], await allFruits.showTotalForType('Banana'));
        
    });




  

  }) 