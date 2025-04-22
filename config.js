const ENV = {
        development: {
                apiUrl: 'api_address',
        },
        production: {
                apiUrl: 'api_address',
        }
};

// Default to development environment
const getEnvironment = () => {
        return __DEV__ ? 'development' : 'production';
};

export default ENV[getEnvironment()];