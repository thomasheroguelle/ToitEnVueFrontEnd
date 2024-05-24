USE toitenvue;

INSERT INTO user (email, username, role, password) 
VALUES ('ledevenherbe@yahoo.com', 'ledevenherbe', 'user', '<PASSWORD>'),
 ('toto@yahoo.com', 'toto', 'user', '$10$qgy.wvcdfeGdS02pPkOCHXzdOgyhz6fFGD2G8pELeMdF23cC.ywxcdweeZvO'),
 ('tata@yahoo.com', 'tata', 'user', '$10$qgy.bKsdqfsdcdsfyhz6fFGD2G8pELeMdF23cC.ydcsdweeZvO');

INSERT INTO housing (address, bathrooms, bedrooms, category, description, highlights, housing_condition, living_space, price, rooms, title, year_of_construction, zipcode, city, user_id)
VALUES ('123 Rue de la République', 2, 3, 'Appartement', 'Bel appartement situé en plein centre-ville.', 'Proche des commerces et des transports en commun', 'Bon état', 80, 150000, 4, 'Bel appartement en centre-ville', 2000, '75001', 'Paris', 1),
 ('456 Avenue des Champs-Élysées', 3, 4, 'Maison', 'Magnifique maison avec jardin et piscine.', 'Vue imprenable sur la Tour Eiffel', 'Excellent état', 200, 500000, 6, 'Villa de luxe avec vue sur Paris', 2010, '75008', 'Paris', 2),
 ('789 Boulevard Saint-Germain', 1, 1, 'Studio', 'Studio confortable dans un quartier animé.', 'Proche des cafés et des théâtres', 'Refait à neuf', 40, 80000, 1, 'Studio moderne à Saint-Germain', 1995, '75006', 'Paris', 3);

INSERT INTO booking (beginning_date, end_date, user_id, housing_id)
VALUES ('2024-10-15', '2024-10-25', 1, 2),
 ('2024-11-02', '2024-11-05', 2, 1),
 ('2025-02-15', '2025-05-18', 3, 1);

 INSERT INTO file (file_name, content_type, housing_id)
 VALUES ('housing1_file1.png', 'image/png', 1),
  ('housing1_file2.png', 'image/png', 1),
  ('housing1_file3.png', 'image/png', 1),
  ('housing1_file4.png', 'image/png', 1),

  ('housing2_file1.jpg', 'image/jpg', 2),
  ('housing2_file2.jpg', 'image/jpg', 2),
  ('housing2_file3.jpg', 'image/jpg', 2),

  ('housing3_file1.png', 'image/png', 3),
  ('housing3_file2.png', 'image/png', 3),
  ('housing3_file3.png', 'image/png', 3);
