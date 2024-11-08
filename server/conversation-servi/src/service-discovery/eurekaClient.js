import { Eureka } from "eureka-js-client";

const eurekaClient = new Eureka({
    instance: {
      app: 'jqservice',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: {
        '$': 8080,
        '@enabled': 'true',
      },
      vipAddress: 'jq.test.something.com',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/'
    },
  });

  eurekaClient.start();
  
  async function getServiceUrl(serviceName) {
      const instances = await eurekaClient.getInstancesByAppId(serviceName);
      if (instances && instances.length > 0) {
        const instance = instances[0];
        return `http://${instance.hostName}:${instance.port['$']}`;
      }
    }

export { eurekaClient, getServiceUrl };