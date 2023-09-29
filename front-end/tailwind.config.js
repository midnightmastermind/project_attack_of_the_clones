/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        // backgroundImage: {
        //     'blue-gradient': 'linear-gradient(#0094cb, #0e0f3b, #0094cb)'
        // },
        extend: {
            colors: {
                'light-blue': '#0093cb',
                'clicked-blue': '#60BBDF',
                'dark-blue': '#0e0f3b',
                'orange-yellow': '#FFAE00',
                'orange': '#F7921D',
            },    
            height: {
                40: '40px',
                80: '80px',
                400: '400px',
                600: '600px'
            },
            borderColor: {
                'light-blue': '#0093cb',
                'dark-blue': '#0e0f3b',
                'orange-yellow': '#ffae00',
                'orange': '#f7921d'
            },    
        }
    },
    plugins: [],
}