function OverleafButton() {
    
  const handleOpen = () => {
    // Backend .tex source file URL
    const texUrl = `${import.meta.env.VITE_API_URL}/api/latex/source`;

    // Encode and build Overleaf project creation link
    const overleafUrl = `https://www.overleaf.com/docs?snip_uri=${encodeURIComponent(texUrl)}`;

    // Open in a new tab
    window.open(overleafUrl, "_blank");
  };

  return (
    <button onClick={handleOpen} className="overleaf-button">
      Open in Overleaf
    </button>
  );
}

export default OverleafButton;