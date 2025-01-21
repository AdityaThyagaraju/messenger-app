package com.dev.conversastionService.Stores;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StatusStore {
    
    private static Map<String, Integer> store = new HashMap<>();

    public void setOnline(String userId) {
        store.put(userId, store.getOrDefault(userId, 0) + 1);
    }

    public void setOffline(String userId) {
        Integer currentSessions = store.get(userId);
        if (currentSessions != null && currentSessions > 1) {
            store.put(userId, currentSessions - 1);
        } else {
            store.remove(userId);
        }
    }

    public String getStatus(String userId) {
        return store.getOrDefault(userId, 0) > 0 ? "online" : "offline";
    }

    public int getSessionCount(String userId) {
        return store.getOrDefault(userId, 0);
    }

    public Map<String, Integer> getOnlineUsers() {
        Map<String, Integer> onlineUsers = new HashMap<>();
        for (Map.Entry<String, Integer> entry : store.entrySet()) {
            if (entry.getValue() > 0) {
                onlineUsers.put(entry.getKey(), entry.getValue());
            }
        }
        return onlineUsers;
    }
}
