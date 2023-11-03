import React, { useState } from 'react';

export default function SellFormCategory({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategoryClick = (categoryIndex) => {
    setSelectedCategory(categoryIndex);
    console.log('aaaaaaaaaaaaaaaa');
  };

  const handleSubcategoryClick = (subcategoryIndex) => {
    setSelectedSubcategory(subcategoryIndex);
    console.log(categories[0].subcategories, 'ssss');
    console.log(subcategoryIndex, 'a');
  };

  return (
    <div className="category-selector">
      {categories.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className={`category ${
            selectedCategory === categoryIndex ? 'selected' : ''
          }`}
          onClick={() => handleCategoryClick(categoryIndex)}
        >
          <h2>{category.name}</h2>
          {selectedCategory === categoryIndex && (
            <div className="subcategories">
              {category.subcategories.map((subcategory, subcategoryIndex) => (
                <div
                  key={subcategoryIndex}
                  className={`subcategory ${
                    selectedSubcategory === subcategoryIndex ? 'selected' : ''
                  }`}
                  onClick={() => handleSubcategoryClick(subcategoryIndex)}
                >
                  <h3>{subcategory.name}</h3>
                  <h3>
                    {selectedSubcategory} {subcategoryIndex}
                  </h3>
                  {selectedSubcategory === subcategoryIndex && (
                    <ul>
                      {subcategory.cities &&
                        subcategory.cities.map((city, cityIndex) => (
                          <li key={cityIndex}>{city}</li>
                        ))}
                      {subcategory.types &&
                        subcategory.types.map((type, typeIndex) => (
                          <li key={typeIndex}>{type}</li>
                        ))}
                      {subcategory.instruments &&
                        subcategory.instruments.map(
                          (instrument, instrumentIndex) => (
                            <li key={instrumentIndex}>{instrument}</li>
                          ),
                        )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
