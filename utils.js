function stringToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

function createScrapperUrls(arr) {
  const slugifiedArray = arr.map((item) => stringToSlug(item));

  const urls = [];

  for (let i = 0; i < slugifiedArray.length; i++) {
    const houseNew = `https://www.metrocuadrado.com/casas/venta/bogota/${slugifiedArray[i]}/nuevo/`;
    const houseUsed = `https://www.metrocuadrado.com/casas/venta/bogota/${slugifiedArray[i]}/usado/`;
    const houseRent = `https://www.metrocuadrado.com/casas/arriendo/bogota/${slugifiedArray[i]}/`;

    const aptNew = `https://www.metrocuadrado.com/apartamentos/venta/bogota/${slugifiedArray[i]}/nuevo/`;
    const aptUsed = `https://www.metrocuadrado.com/apartamentos/venta/bogota/${slugifiedArray[i]}/usado/`;
    const aptRent = `https://www.metrocuadrado.com/apartamentos/arriendo/bogota/${slugifiedArray[i]}/`;

    const officeNew = `https://www.metrocuadrado.com/oficinas/venta/bogota/${slugifiedArray[i]}/nuevo/`;
    const officeUsed = `https://www.metrocuadrado.com/oficinas/venta/bogota/${slugifiedArray[i]}/usado/`;
    const officeRent = `https://www.metrocuadrado.com/oficinas/arriendo/bogota/${slugifiedArray[i]}/`;

    urls.push(
      {
        name: arr[i],
        type: "Casa Nueva",
        link: houseNew,
        total: null,
      },
      {
        name: arr[i],
        type: "Casa Usada",
        link: houseUsed,
        total: null,
      },
      {
        name: arr[i],
        type: "Casa Arriendo",
        link: houseRent,
        total: null,
      },
      {
        name: arr[i],
        type: "Departamento Nuevo",
        link: aptNew,
        total: null,
      },
      {
        name: arr[i],
        type: "Departamento Usado",
        link: aptUsed,
        total: null,
      },
      {
        name: arr[i],
        type: "Departamento Arriendo",
        link: aptRent,
        total: null,
      },
      {
        name: arr[i],
        type: "Oficina Nueva",
        link: officeNew,
        total: null,
      },
      {
        name: arr[i],
        type: "Oficina Usada",
        link: officeUsed,
        total: null,
      },
      {
        name: arr[i],
        type: "Oficina Arriendo",
        link: officeRent,
        total: null,
      }
    );
  }

  return urls;
}

module.exports = {
  stringToSlug,
  createScrapperUrls,
};
