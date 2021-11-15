create table fruit_basket(
   id serial not null primary key,
   fruit_name text not null,
   price decimal(10,2),
   quantity integer not null
);
