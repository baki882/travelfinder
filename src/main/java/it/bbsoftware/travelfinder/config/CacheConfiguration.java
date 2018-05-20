package it.bbsoftware.travelfinder.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(it.bbsoftware.travelfinder.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.Agenzia.class.getName(), jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.Agenzia.class.getName() + ".sedes", jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.Indirizzo.class.getName(), jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.Department.class.getName(), jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.Employee.class.getName(), jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.Job.class.getName(), jcacheConfiguration);
            cm.createCache(it.bbsoftware.travelfinder.domain.JobHistory.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
