DROP TABLE global_sales;

CREATE TABLE global_sales (
	id integer PRIMARY KEY,
	Name VARCHAR,
	Company	VARCHAR,
	Platform VARCHAR,
	Year INT,
	Genre VARCHAR,
	Publisher VARCHAR,
	NA_Sales FLOAT,
	EU_Sales FLOAT,
	JP_Sales FLOAT,
	Other_Sales FLOAT,
	Global_Sales FLOAT
);

SELECT Company, year, ROUND(SUM(na_sales):: numeric, 2) AS tot_nasales,
	ROUND(SUM(eu_sales):: numeric, 2) AS tot_eusales,
	ROUND(SUM(jp_sales):: numeric, 2) AS tot_jpsales,
	ROUND(SUM(other_sales):: numeric, 2) AS tot_othersales,
	ROUND(SUM(global_sales):: numeric, 2) AS tot_globalsales
FROM global_sales
WHERE year >= 2001 AND year < 2017
GROUP BY company, year
ORDER BY year;

SELECT name, Company, genre, year, global_sales FROM 
	(SELECT name, Company, genre, year, global_sales, 
	 rank() OVER (PARTITION BY year ORDER BY global_sales DESC) 
	 FROM global_sales WHERE year >= 2001 AND year < 2017) global_sales
WHERE rank <=3
ORDER BY year;

SELECT genre, year, ROUND(SUM(na_sales):: numeric, 2) AS tot_nasales,
	ROUND(SUM(eu_sales):: numeric, 2) AS tot_eusales,
	ROUND(SUM(jp_sales):: numeric, 2) AS tot_jpsales,
	ROUND(SUM(other_sales):: numeric, 2) AS tot_othersales,
	ROUND(SUM(global_sales):: numeric, 2) AS tot_globalsales
INTO genre_sales
FROM global_sales
WHERE year >= 2001 AND year < 2017
GROUP BY genre, year
ORDER BY year, tot_globalsales DESC;

SELECT * FROM 
	(SELECT *, rank() OVER (PARTITION BY year ORDER BY tot_globalsales DESC) 
	 FROM genre_sales) genre_sales
WHERE rank <=3
ORDER BY year;

SELECT company, genre, year, ROUND(SUM(na_sales):: numeric, 2) AS tot_nasales,
	ROUND(SUM(eu_sales):: numeric, 2) AS tot_eusales,
	ROUND(SUM(jp_sales):: numeric, 2) AS tot_jpsales,
	ROUND(SUM(other_sales):: numeric, 2) AS tot_othersales,
	ROUND(SUM(global_sales):: numeric, 2) AS tot_globalsales
INTO topgensales_percompany
FROM global_sales
WHERE year >= 2001 AND year < 2017
GROUP BY genre, year, company
ORDER BY year, company, tot_globalsales DESC;

SELECT * FROM 
	(SELECT *, rank() OVER (PARTITION BY year ORDER BY tot_globalsales DESC) 
	 FROM topgensales_percompany) topgensales_percompany
WHERE rank <=3
ORDER BY year;