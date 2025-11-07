import React, { useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';

const ImageUpload = ({ onChange }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const onPick = () => inputRef.current?.click();

  const handleFiles = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file, url);
  };

  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={onPick} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800">
        <ImagePlus size={16}/> Upload Gambar
      </button>
      {preview && (
        <img src={preview} alt="preview" className="h-12 w-12 rounded object-cover border border-zinc-200 dark:border-zinc-800" />
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFiles} />
    </div>
  );
};

export default ImageUpload;
