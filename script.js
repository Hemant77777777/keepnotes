const addBtn = document.querySelector("#addbtn");
const main = document.querySelector("#main");

const savenotes = () => 
{
  const notes = document.querySelectorAll(".note textarea");
 // console.log(notes);
  const data = [];
  notes.forEach( 
    (note) => { 
        data.push(note.value)
    }
  )
  localStorage.setItem("notes", JSON.stringify(data));
  
}


addBtn.addEventListener("click", function()
{
    addNote();
});


const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    
    <div class="note">
        <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
            <i class="trash fa-solid fa-trash"></i>
            
        </div>
        <textarea>${text}</textarea>
    </div>
    `;
    note.querySelector(".trash").addEventListener("click", function()
    {
        note.remove();
        savenotes();
    });
    note.querySelector(".save").addEventListener("click", function()
    {
        savenotes();
        addNote();
    });
    note.querySelector("textarea").addEventListener("focusout" ,function()
    {
        savenotes();
    })
    main.appendChild(note);
    savenotes();

}
(
    function()
    {
       const lsnotes = JSON.parse(localStorage.getItem("notes"));
       lsnotes.forEach(
        (lsnote) => {
            addNote(lsnote);
        }
       )
       if(lsnotes.length == 0 )
       {
        localStorage.removeItem("notes");
       }
       else{
        addNote();
       }
    }
)();
