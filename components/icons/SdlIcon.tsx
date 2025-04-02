import Image from 'next/image';

export function SdlIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <div className="inline-block" >
            <Image
                src="/static/icons/sdl2.svg"
                alt="SDL2 Icon"
                width={24}
                height={24}
            />
        </div>
    );
}