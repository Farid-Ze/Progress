// MongoDB initialization script for Merajut ASA
// This script creates collections and indexes for the application

db = db.getSiblingDB('merajut_asa');

// Analytics Collection - Store detailed analytics data
db.createCollection("analytics", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["event", "timestamp", "source"],
      properties: {
        event: {
          bsonType: "string",
          description: "Event name (e.g., 'campaign_view', 'donation_made')"
        },
        timestamp: {
          bsonType: "date",
          description: "Event timestamp"
        },
        source: {
          bsonType: "string",
          description: "Source of the event (e.g., 'web', 'mobile')"
        },
        userId: {
          bsonType: "string",
          description: "User ID if available"
        },
        sessionId: {
          bsonType: "string",
          description: "Session ID"
        },
        campaignId: {
          bsonType: "string",
          description: "Campaign ID if applicable"
        },
        properties: {
          bsonType: "object",
          description: "Additional event properties"
        },
        metadata: {
          bsonType: "object",
          description: "Additional metadata"
        }
      }
    }
  }
});

// Campaign Analytics - Aggregated campaign metrics
db.createCollection("campaign_analytics", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["campaignId", "date"],
      properties: {
        campaignId: {
          bsonType: "string",
          description: "Campaign ID"
        },
        date: {
          bsonType: "date",
          description: "Date of the metrics"
        },
        metrics: {
          bsonType: "object",
          properties: {
            views: { bsonType: "int" },
            uniqueViews: { bsonType: "int" },
            donations: { bsonType: "int" },
            donationAmount: { bsonType: "decimal" },
            shares: { bsonType: "int" },
            likes: { bsonType: "int" },
            comments: { bsonType: "int" },
            conversionRate: { bsonType: "decimal" }
          }
        }
      }
    }
  }
});

// User Sessions - Store user session data
db.createCollection("user_sessions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["sessionId", "userId", "createdAt"],
      properties: {
        sessionId: {
          bsonType: "string",
          description: "Unique session identifier"
        },
        userId: {
          bsonType: "string",
          description: "User ID"
        },
        ipAddress: {
          bsonType: "string",
          description: "User IP address"
        },
        userAgent: {
          bsonType: "string",
          description: "User agent string"
        },
        device: {
          bsonType: "object",
          properties: {
            type: { bsonType: "string" },
            os: { bsonType: "string" },
            browser: { bsonType: "string" }
          }
        },
        location: {
          bsonType: "object",
          properties: {
            country: { bsonType: "string" },
            region: { bsonType: "string" },
            city: { bsonType: "string" },
            coordinates: {
              bsonType: "array",
              items: { bsonType: "double" }
            }
          }
        },
        createdAt: {
          bsonType: "date",
          description: "Session creation timestamp"
        },
        expiresAt: {
          bsonType: "date",
          description: "Session expiration timestamp"
        },
        lastActivity: {
          bsonType: "date",
          description: "Last activity timestamp"
        }
      }
    }
  }
});

// Activity Logs - Store detailed activity logs
db.createCollection("activity_logs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["action", "timestamp", "userId"],
      properties: {
        action: {
          bsonType: "string",
          description: "Action performed"
        },
        timestamp: {
          bsonType: "date",
          description: "Action timestamp"
        },
        userId: {
          bsonType: "string",
          description: "User who performed the action"
        },
        resourceType: {
          bsonType: "string",
          description: "Type of resource (e.g., 'campaign', 'user')"
        },
        resourceId: {
          bsonType: "string",
          description: "ID of the resource"
        },
        changes: {
          bsonType: "object",
          description: "Changes made (before/after)"
        },
        metadata: {
          bsonType: "object",
          description: "Additional metadata"
        }
      }
    }
  }
});

// Search Indexes - Store search-related data
db.createCollection("search_indexes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["type", "resourceId", "content"],
      properties: {
        type: {
          bsonType: "string",
          description: "Type of resource (campaign, user, organization)"
        },
        resourceId: {
          bsonType: "string",
          description: "ID of the resource"
        },
        content: {
          bsonType: "object",
          description: "Searchable content"
        },
        tags: {
          bsonType: "array",
          items: { bsonType: "string" },
          description: "Tags for categorization"
        },
        lastIndexed: {
          bsonType: "date",
          description: "Last indexing timestamp"
        }
      }
    }
  }
});

// File Uploads - Store file metadata
db.createCollection("file_uploads", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["filename", "originalName", "mimeType", "size", "uploadedBy"],
      properties: {
        filename: {
          bsonType: "string",
          description: "Stored filename"
        },
        originalName: {
          bsonType: "string",
          description: "Original filename"
        },
        mimeType: {
          bsonType: "string",
          description: "MIME type"
        },
        size: {
          bsonType: "int",
          description: "File size in bytes"
        },
        uploadedBy: {
          bsonType: "string",
          description: "User ID who uploaded the file"
        },
        uploadedAt: {
          bsonType: "date",
          description: "Upload timestamp"
        },
        path: {
          bsonType: "string",
          description: "File path"
        },
        url: {
          bsonType: "string",
          description: "Public URL"
        },
        metadata: {
          bsonType: "object",
          description: "Additional file metadata"
        }
      }
    }
  }
});

// Email Templates - Store email templates
db.createCollection("email_templates", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "subject", "content"],
      properties: {
        name: {
          bsonType: "string",
          description: "Template name"
        },
        subject: {
          bsonType: "string",
          description: "Email subject"
        },
        content: {
          bsonType: "string",
          description: "Email content (HTML)"
        },
        variables: {
          bsonType: "array",
          items: { bsonType: "string" },
          description: "Template variables"
        },
        category: {
          bsonType: "string",
          description: "Template category"
        },
        isActive: {
          bsonType: "bool",
          description: "Whether template is active"
        },
        createdAt: {
          bsonType: "date",
          description: "Creation timestamp"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update timestamp"
        }
      }
    }
  }
});

// Audit Logs - Store audit trail
db.createCollection("audit_logs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["action", "timestamp", "userId", "resource"],
      properties: {
        action: {
          bsonType: "string",
          description: "Action performed"
        },
        timestamp: {
          bsonType: "date",
          description: "Action timestamp"
        },
        userId: {
          bsonType: "string",
          description: "User who performed the action"
        },
        resource: {
          bsonType: "object",
          properties: {
            type: { bsonType: "string" },
            id: { bsonType: "string" }
          }
        },
        changes: {
          bsonType: "object",
          description: "Changes made"
        },
        ip: {
          bsonType: "string",
          description: "IP address"
        },
        userAgent: {
          bsonType: "string",
          description: "User agent"
        }
      }
    }
  }
});

// Create indexes for better performance

// Analytics indexes
db.analytics.createIndex({ "event": 1, "timestamp": -1 });
db.analytics.createIndex({ "userId": 1, "timestamp": -1 });
db.analytics.createIndex({ "campaignId": 1, "timestamp": -1 });
db.analytics.createIndex({ "sessionId": 1 });
db.analytics.createIndex({ "timestamp": -1 });

// Campaign Analytics indexes
db.campaign_analytics.createIndex({ "campaignId": 1, "date": -1 });
db.campaign_analytics.createIndex({ "date": -1 });

// User Sessions indexes
db.user_sessions.createIndex({ "sessionId": 1 }, { unique: true });
db.user_sessions.createIndex({ "userId": 1, "createdAt": -1 });
db.user_sessions.createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });

// Activity Logs indexes
db.activity_logs.createIndex({ "userId": 1, "timestamp": -1 });
db.activity_logs.createIndex({ "resourceType": 1, "resourceId": 1, "timestamp": -1 });
db.activity_logs.createIndex({ "timestamp": -1 });

// Search Indexes
db.search_indexes.createIndex({ "type": 1, "resourceId": 1 }, { unique: true });
db.search_indexes.createIndex({ "content": "text", "tags": "text" });
db.search_indexes.createIndex({ "lastIndexed": -1 });

// File Uploads indexes
db.file_uploads.createIndex({ "filename": 1 }, { unique: true });
db.file_uploads.createIndex({ "uploadedBy": 1, "uploadedAt": -1 });
db.file_uploads.createIndex({ "mimeType": 1 });

// Email Templates indexes
db.email_templates.createIndex({ "name": 1 }, { unique: true });
db.email_templates.createIndex({ "category": 1 });
db.email_templates.createIndex({ "isActive": 1 });

// Audit Logs indexes
db.audit_logs.createIndex({ "userId": 1, "timestamp": -1 });
db.audit_logs.createIndex({ "resource.type": 1, "resource.id": 1, "timestamp": -1 });
db.audit_logs.createIndex({ "timestamp": -1 });

// Insert default email templates
db.email_templates.insertMany([
  {
    name: "welcome",
    subject: "Welcome to Merajut ASA",
    content: "<h1>Welcome {{name}}!</h1><p>Thank you for joining our community.</p>",
    variables: ["name"],
    category: "authentication",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "email_verification",
    subject: "Please verify your email",
    content: "<h1>Email Verification</h1><p>Please click the link to verify your email: <a href='{{verificationUrl}}'>Verify Email</a></p>",
    variables: ["verificationUrl"],
    category: "authentication",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "password_reset",
    subject: "Password Reset Request",
    content: "<h1>Password Reset</h1><p>Click the link to reset your password: <a href='{{resetUrl}}'>Reset Password</a></p>",
    variables: ["resetUrl"],
    category: "authentication",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "donation_confirmation",
    subject: "Donation Confirmation",
    content: "<h1>Thank you for your donation!</h1><p>Your donation of {{amount}} to {{campaignTitle}} has been confirmed.</p>",
    variables: ["amount", "campaignTitle"],
    category: "donations",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "campaign_approved",
    subject: "Campaign Approved",
    content: "<h1>Congratulations!</h1><p>Your campaign '{{campaignTitle}}' has been approved and is now live.</p>",
    variables: ["campaignTitle"],
    category: "campaigns",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print("MongoDB collections and indexes created successfully!");
