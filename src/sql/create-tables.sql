CREATE TABLE 
	IF NOT EXISTS
		products(
			product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			name VARCHAR(50) NOT NULL,
			description VARCHAR (255) NOT NULL,
			brand VARCHAR(50) NOT NULL,
			image_url VARCHAR (255) NOT NULL,
			price VARCHAR NOT NULL,
			category VARCHAR (50) NOT NULL,
			created_at TIMESTAMPTZ DEFAULT NOW(),
			updated_at TIMESTAMPTZ DEFAULT NOW()
	);

	CREATE TABLE 
	IF NOT EXISTS
		reviews(
			review_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			name VARCHAR(50) NOT NULL,
			comment VARCHAR (255) NOT NULL,
			rate INTEGER NOT NULL,
			product_id INTEGER REFERENCES products ON DELETE CASCADE,
			created_at TIMESTAMPTZ DEFAULT NOW(),
			updated_at TIMESTAMPTZ DEFAULT NOW()
	);

/* {
    "name":{{$randomFirstName}},
    "description":{{$randomLoremSentences}},
    "brand":{{$randomLoremWord}},
    "image_url":{{$randomImageUrl}},
    "price":{{$randomPrice}},
    "category":{{$randomWord}}

} */
/* {
    "name":"delsssssssssss",
    "description":"laptohrtzrtp",
    "brand":"dell",
    "image_url":"laptoztrzp",
    "price":700,
    "category":"laptdfdhgdop"

} */