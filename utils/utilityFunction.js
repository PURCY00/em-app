// export const fn = () => {
//     //writ a function that converts px to rem

// };

export const fn = {
    rem: (pxValue) => {
        return `${pxValue / 16}rem`;
    },
    em: (pxValue) => {
        return `${pxValue / 16}em`;
    },
};
