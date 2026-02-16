function OverleafButton({ latexCode }) {

  const handleOpen = () => {
    if (!latexCode) {
      alert("Please generate your resume first!");
      return;
    }

    // Submit LaTeX directly to Overleaf via form POST using encoded_snip.
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://www.overleaf.com/docs";
    form.target = "_blank";

    const snipInput = document.createElement("input");
    snipInput.type = "hidden";
    snipInput.name = "encoded_snip";
    snipInput.value = encodeURIComponent(latexCode);
    form.appendChild(snipInput);

    const nameInput = document.createElement("input");
    nameInput.type = "hidden";
    nameInput.name = "snip_name";
    nameInput.value = "resume.tex";
    form.appendChild(nameInput);

    const engineInput = document.createElement("input");
    engineInput.type = "hidden";
    engineInput.name = "engine";
    engineInput.value = "pdflatex";
    form.appendChild(engineInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <button onClick={handleOpen} className="overleaf-button">
      Open in Overleaf
    </button>
  );
}

export default OverleafButton;