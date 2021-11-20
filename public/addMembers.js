{/* <div class="input-group mt-3">
  <input
    type="text"
    class="form-control"
    aria-label="Recipient's username with two button addons"
  />
  <button class="btn btn-outline-secondary" type="button">
    Remove
  </button>
</div> */}

const name = document.getElementById("name");
const email = document.getElementById("memberEmail");
const Memberbtn = document.getElementById('addMemberbtn');
const member = document.getElementById('members');

Memberbtn.addEventListener("click", () => {
  const data = `<div class="input-group mt-3">
  <input
    type="text"
    class="form-control"
    aria-label="Recipient's username with two button addons"
  />
  <button class="btn btn-outline-secondary" type="button">
    Remove
  </button>
</div>`;
  
  member.append(data);
  console.log(name.value);
  console.log(email.value);
});


