import { SVGProps } from 'react';

export const RankOne = (props: SVGProps<SVGSVGElement>) => (
  <div className="flex items-center gap-x-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={18}
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth={0.571}
        d="M11.857 5.186a6.286 6.286 0 1 0 .571 7.93"
      />
      <path
        fill="currentColor"
        d="M6.949 13.929c-.076 0-.114-.038-.114-.115V7.437l-1.44.8a.27.27 0 0 1-.115.035c-.06 0-.091-.035-.091-.103v-.995c0-.076.042-.133.126-.171l1.874-1.017a.327.327 0 0 1 .171-.057h.526c.076 0 .114.038.114.114v7.771c0 .077-.038.115-.114.115h-.937ZM11.167 11.36c-.338 0-.645-.068-.919-.205a1.664 1.664 0 0 1-.651-.562 1.405 1.405 0 0 1-.24-.803c0-.045.022-.068.068-.068h.576c.023 0 .039.007.048.02.01.01.016.025.02.048.019.28.129.5.33.665.201.16.464.24.788.24.339 0 .602-.066.789-.198a.65.65 0 0 0 .288-.57c0-.192-.103-.345-.309-.459-.2-.119-.489-.226-.864-.322-.539-.137-.944-.311-1.213-.521-.265-.21-.398-.503-.398-.878 0-.279.075-.517.226-.713.151-.201.35-.352.597-.453.251-.105.526-.158.823-.158.333 0 .628.064.884.192s.453.298.59.508c.142.21.217.439.226.686 0 .045-.023.068-.068.068h-.576c-.023 0-.04-.004-.048-.014a.154.154 0 0 1-.02-.054.697.697 0 0 0-.316-.528 1.155 1.155 0 0 0-.68-.192c-.269 0-.49.054-.664.164a.516.516 0 0 0-.26.46c0 .21.1.374.3.493.207.12.508.231.906.336.498.137.885.307 1.159.508a.944.944 0 0 1 .418.816c0 .48-.164.85-.494 1.11-.324.257-.763.385-1.316.385Zm3.578-.068c-.046 0-.069-.023-.069-.069V7.157h-1.378c-.046 0-.069-.023-.069-.068V6.56c0-.046.023-.069.069-.069h3.47c.045 0 .068.023.068.069v.528c0 .045-.023.068-.068.068h-1.379v4.066c0 .046-.023.069-.068.069h-.576Z"
      />
    </svg>
  </div>
);
