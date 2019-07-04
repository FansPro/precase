const host = {
    dev: {
        API_HOST: "http://xxx.com",
    },
    prod: {
        API_HOST: "http://xxx.com",
    }
}

const ENV = "dev";
const currentHost = host[ENV];
const API_HOST = currentHost.API_HOST;

export {
    API_HOST,
}
