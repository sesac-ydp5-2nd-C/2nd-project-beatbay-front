import React from 'react';
import './style.scss';

function SellFormCategory({
  categories,
  selectedType,
  selectedCategory,
  selectedSubCategory,
  setSelectedType,
  setSelectedCategory,
  setSelectedSubCategory,
}) {
  const handleTypeClick = (index) => {
    setSelectedType(index);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  const handleCategoryClick = (index) => {
    if (selectedType !== null) {
      setSelectedCategory(index);
      setSelectedSubCategory(null);
    }
  };

  const handleSubCategoryClick = (index) => {
    if (selectedType !== null && selectedCategory !== null) {
      setSelectedSubCategory(index);
      console.log(selectedType, selectedCategory + 1, index + 1);
    }
  };

  return (
    <div className="categoriesContainer">
      <div className="categoryListContainer">
        {categories.map((category, index) => (
          <div
            key={index}
            className={
              selectedType === index ? 'selected categoryItem' : 'categoryItem'
            }
            onClick={() => handleTypeClick(index)}
          >
            {category.name}
          </div>
        ))}
      </div>

      <div className="categoryListContainer">
        {selectedType === null && (
          <div className="message">상위 카테고리를 선택해주세요.</div>
        )}

        {selectedType !== null && (
          <div className="sellCategoryList">
            {categories[selectedType].subcategories.map(
              (subcategory, index) => (
                <div
                  key={index}
                  className={
                    selectedCategory === index
                      ? 'selected subcategoryItem'
                      : 'subcategoryItem'
                  }
                  onClick={() => handleCategoryClick(index)}
                >
                  {subcategory.name}
                </div>
              ),
            )}
          </div>
        )}
      </div>

      <div className="categoryListContainer">
        {selectedCategory == null && (
          <div className="message">상위 카테고리를 선택해주세요.</div>
        )}
        {selectedType !== null && selectedCategory !== null && (
          <div className="sellSubCategoryList">
            {categories[selectedType].subcategories[selectedCategory].items.map(
              (item, index) => (
                <div
                  key={index}
                  className={
                    selectedSubCategory === index
                      ? 'selectedItem selected'
                      : 'selectedItem'
                  }
                  onClick={() => handleSubCategoryClick(index)}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellFormCategory;
