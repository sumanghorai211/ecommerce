export async function fetchProductById(id) {
  const response = await fetch("http://localhost:8080/products/" + id);
  const data = await response.json();
  return { data };
}

export async function createProduct(product) {
  const response = await fetch("http://localhost:8080/products/", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
}

export async function updateProduct(update) {
  const response = await fetch("http://localhost:8080/products/" + update.id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
}

export async function fetchProductsByFilters(filter, sort, pagination, admin) {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }

  const response = await fetch("http://localhost:8080/products?" + queryString);
  const data = await response.json();
  const totalItems = await response.headers.get("X-Total-Count");
  return { data: { products: data, totalItems: +totalItems } };
}

export async function fetchCategories() {
  const response = await fetch("http://localhost:8080/categories");
  const data = await response.json();
  return { data };
}

export async function createCategory(category) {
  const response = await fetch("http://localhost:8080/categories", {
    method: "POST",
    body: JSON.stringify(category),
    headers: { "content-type": "application/json" },
  });

  const data = await response.json();
  return { data };
}

export async function createBrand(brand) {
  const response = await fetch("http://localhost:8080/brands", {
    method: "POST",
    body: JSON.stringify(brand),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return { data };
}

export async function fetchBrands() {
  const response = await fetch("http://localhost:8080/brands");
  const data = await response.json();
  return { data };
}
