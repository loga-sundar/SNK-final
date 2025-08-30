// Mobile menu
document.getElementById('menuBtn').addEventListener('click', function(){
  document.getElementById('mobileMenu').classList.toggle('open');
});

// Smooth reveal on scroll
function revealOnScroll(){
  document.querySelectorAll('.reveal').forEach(function(el){
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 60){ el.classList.add('show'); }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Estimator logic (Equipment + Hours only)
const hoursEl = document.getElementById('hours');
const equipmentEl = document.getElementById('equipment'); // text input
const usageEl = document.getElementById('usage');
const totalEl = document.getElementById('total');

// Equipment rate map
const equipmentRates = {
  "5-plow": 1100,
  "7-plow": 1200,
  "9-plow": 1000,
  "rotavator": 1200,
  "mulcher": 1600,
  "cage wheel": 1200
};

function updateEstimate(){
  const hours = Number(hoursEl.value) || 0;
  const equipmentName = (equipmentEl.value || "").toLowerCase().trim();

  const rate = equipmentRates[equipmentName] || 0;

  if(rate === 0 && equipmentName !== ""){
    usageEl.textContent = "⚠ Unknown equipment, please check spelling.";
    totalEl.textContent = "";
    return;
  }

  const usageCharge = hours * rate;

  usageEl.textContent = 'Usage: ₹ ' + usageCharge.toLocaleString('en-IN');
  totalEl.textContent = 'Estimated Total: ₹ ' + usageCharge.toLocaleString('en-IN');
}

// Event listeners
[hoursEl, equipmentEl].forEach(el => el.addEventListener('input', updateEstimate));
updateEstimate();

// Contact form (demo only)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.textContent = 'Sending...';
    setTimeout(function(){
      status.textContent = 'Message sent. We will contact you shortly (or message on WhatsApp).';
      contactForm.reset();
    }, 800);
  });
}

// set year in footer
document.getElementById('year').textContent = new Date().getFullYear();
