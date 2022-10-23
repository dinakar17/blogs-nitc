type Props = {
    src: string;
    width: number;
    quality?: number;
}

export const customLoader = ({ src, width, quality }: Props) => {
    return `${src}?w=${width}&q=${quality || 75}`
}