// values for dropdown menu
export const step = [
    { label: "1 - Pre Adviser", value: "1" },
    { label: "2 - Adviser", value: "2" },
    { label: "3 - Clearance Officer", value: "3" },
];

export const status = [
    { label: "Open", value: "Open" },
    { label: "Pending", value: "Pending" },
    { label: "Closed", value: "Closed" },
    { label: "Cleared", value: "Cleared" },
];

export const date = [
    { label: "Date: Ascending", value: "Ascending" },
    { label: "Date: Descending", value: "Descending" },
]

export const name = [
    { label: "Name: Ascending", value: "Ascending" },
    { label: "Name: Descending", value: "Descending" },
]

// styling for Dropdown menu
export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white', fontSize: 14, borderColor: 'black' }),
    option: (styles) => {
        return {
            ...styles,
            fontSize: 14,
            color: 'black',
        };
    },
};