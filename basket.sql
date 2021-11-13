create table fruit_basket(
   id serial not null primary key,
   fruit_name text not null,
   price decimal(10,2),
   quantity integer not null
);
-- INSERT INTO fruit_basket(type,price,quantity) VALUES('Orange',4.00,5);
-- INSERT INTO fruit_basket(type,price,quantity) VALUES('Apple',2.00,4);
-- INSERT INTO fruit_basket(type,price,quantity) VALUES('Banana',5.00,5);