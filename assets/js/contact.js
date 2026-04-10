(function () {
  const data = window.SiteData;
  if (!data) return;

  const houseSelect = document.getElementById('contact-house');
  if (houseSelect) {
    houseSelect.innerHTML = '<option value="">Not specific yet</option>' + data.houses.map((house) => `<option value="${house.slug}">${house.title}</option>`).join('');
  }

  const map = document.getElementById('contact-map');
  if (map) {
    const first = data.houses[0];
    const lat = first.coordinates.lat;
    const lng = first.coordinates.lng;
    const delta = 0.13;
    const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join(',');
    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  }

  const profilePhone = document.getElementById('contact-phone');
  const profileEmail = document.getElementById('contact-email');
  const profileAddress = document.getElementById('contact-address');

  if (profilePhone) profilePhone.textContent = data.site.phone;
  if (profileEmail) profileEmail.textContent = data.site.email;
  if (profileAddress) profileAddress.textContent = data.site.address;
})();
