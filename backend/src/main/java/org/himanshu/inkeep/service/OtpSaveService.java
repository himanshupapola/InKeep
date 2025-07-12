package org.himanshu.inkeep.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.net.URI;

@Service
public class OtpSaveService {

    @Value("${upstash.redis.url}")
    private String redisUrl;

    private Jedis getJedisClient() {
        return new Jedis(URI.create(redisUrl));
    }

    public void saveOtp(String email, String otp) {
        try (Jedis jedis = getJedisClient()) {
            String key = "otp:" + email.toLowerCase();
            jedis.setex(key, 600, otp);
        }
    }

    public String getOtp(String email) {
        try (Jedis jedis = getJedisClient()) {
            String key = "otp:" + email.toLowerCase();
            return jedis.get(key);
        }
    }

    public void deleteOtp(String email) {
        try (Jedis jedis = getJedisClient()) {
            String key = "otp:" + email.toLowerCase();
            jedis.del(key);
        }
    }
}
