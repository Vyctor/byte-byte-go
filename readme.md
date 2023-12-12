# Byte Byte Go System Design Interview Course

- [Byte Byte Go System Design Interview Course](#byte-byte-go-system-design-interview-course)
  - [Scale from Zero to Millions of Users](#scale-from-zero-to-millions-of-users)
    - [Wich Database to use?](#wich-database-to-use)
      - [Relational Databases](#relational-databases)
      - [Non-relational Databases](#non-relational-databases)
    - [Vertical versus Horizontal Scaling](#vertical-versus-horizontal-scaling)
    - [Load balancer](#load-balancer)
    - [Database Replication](#database-replication)
    - [Caching](#caching)
      - [Cache Tier](#cache-tier)
      - [Considerations for using cache](#considerations-for-using-cache)
    - [Content Delivery Network (CDN)](#content-delivery-network-cdn)
      - [Considerations of using a CDN](#considerations-of-using-a-cdn)
    - [Stateless web tier](#stateless-web-tier)
    - [Stateful architecture](#stateful-architecture)
    - [Stateles architecture](#stateles-architecture)
    - [Message Queue](#message-queue)
    - [Logging, metrics, autmation](#logging-metrics-autmation)
      - [Logging](#logging)
      - [Metrics](#metrics)
      - [Automation](#automation)
    - [Database scalling](#database-scalling)
    - [Millions of users and beyond](#millions-of-users-and-beyond)

## Scale from Zero to Millions of Users

Design system required continuous refinement and endless improvement. In this chapter we'll build a system that supports a single user and gradually scale it up to serve millions of users.

### Wich Database to use?

#### Relational Databases

Also called RDBMS or SQL databases. Represent and store data in tables and rows.

#### Non-relational Databases

Are also called NoSQL databases. These databases are grouped into four categories: key-value stores, document stores, column-oriented databases, and graph databases.
Non relational databases might be the right choice for your application if:

- Requires super-low latency
- Your data are not structured, or you dont have any relational data
- You only need to serialize data (JSON, XML, YAML, etc)
- You need to store a massive amount of data

### Vertical versus Horizontal Scaling

Vertical scaling, means add more process power to your existing server, or replace it with a more powerful one.
Horizontal scaling referred to as scaling out, means add more servers into your pool of resources.

Vertical scalling is a great option for low traffic, it is simples and easier to implement. But if comes with serious limitations:

- Vertical scaling has a hard limit. It's impossible to add unlimited CPU and memory to a single server
- Vertical scale does not have failover and redundancy. If the server goes down, your application goes down with it

Horizontal scaling is more desirable for high traffic applications due the limitations of vertical scaling. It's also more complex to implement.

### Load balancer

A load balancer evenly distributes incoming traffic among web server that are defined in a load-balance set.

### Database Replication

Database replication can be used in many database management systems, usually with a master/slave relationship between the original and the copies.
A master database generally only supports write operations. A slave database gets copies of the master's data and only supports read operations. Most applications requires more read operations than write operations, so this is a good way to scale your database. Usually a system has one master database and multiple slave databases.

The advantages of database replication are:

- Better performance
  - Allows more queries to be processed in parallel
- Reliability
  - If one instance of your database goes down the others can still process queries
- High availability
  - By replicate data across multiple servers, you can ensure that your application is always available

### Caching

A cache is a temporary store area that stores the result of expensive responses or frequently accessed data in memory so that future requests for that data can be served faster.

#### Cache Tier

Is a temporary data store layer, much faster than the database. The benefits of having a separate cache tier include better system performance, ability to reduce database workloads and the ability to scale the cache tier independently of the database tier.

#### Considerations for using cache

- Consider using cache when data is read frequently but rarely updated
- Expiration Policy is a good practice to avoid stale data
- Ensure that data store and cache are in sync. Inconsistency can happen when data is updated in the database but not in the cache

### Content Delivery Network (CDN)

A content delivery network (CDN) is a system of distributed servers (network) that deliver pages and other Web content to a user, based on the geographic locations of the user, the origin of the webpage and the content delivery server.

#### Considerations of using a CDN

- Cost: CDNs are run by third-party providers, and you are charged for data transfers in and out of the CDN. Caching infrequently used assets provides no significant benefits so you should consider moving them out of the CDN.
- Setting an appropriate cache expiry: For time-sensitive content, setting a cache expiry time is important. The cache expiry time should neither be too long nor too short. If it is too long, the content might no longer be fresh. If it is too short, it can cause repeat reloading of content from origin servers to the CDN.
- CDN fallback: You should consider how your website/application copes with CDN failure. If there is a temporary CDN outage, clients should be able to detect the problem and request resources from the origin.
- Invalidating files: You can remove a file from the CDN before it expires by performing one of the following operations:
- Invalidate the CDN object using APIs provided by CDN vendors.
- Use object versioning to serve a different version of the object. To version an object, you can add a parameter to the URL, such as a version number. For example, version number 2 is added to the query string: image.png?v=2.

### Stateless web tier

To scale your application, you need to make sure that your web tier is stateless. This means that the web server does not store any data related to the user session. All the data is stored in the database or cache. This allows you to add more web servers to your pool of resources without worrying about session affinity.

### Stateful architecture

A Stateful server remembers client data (state) from one request to the next. This means that all the data related to the user session is stored in the web server. This is not a good architecture for scaling your application, because you need to make sure that the user session is always routed to the same web server. This is called session affinity. If the web server goes down, the user session is lost.

### Stateles architecture

In stateless architecture, the web server does not store any data related to the user session. All the data is stored in the database or cache. This allows you to add more web servers to your pool of resources without worrying about session affinity.
Stateless if simplier, more robust and easier to scale.

### Message Queue

Message Queue is a durable component, stored in memory, that supports asynchronous communication. It servers as a buffer and distributes assynchronous requests.
The basic architecutre of a message queue is simple. Input services called producers/publishers send messages to the queue. Output services called consumers/subscribers receive messages from the queue. The queue stores the messages until they are processed by the consumers.

Decoupling makes the message queues a great choice for scaling your application. A producer can post a message into a queue that only be processed when a consumer is available. And the consumer can read the queue message even if the producer is down.

### Logging, metrics, autmation

When working on a high traffic application its necessary to have a good logging, metrics and automation support. This will help you to identify and fix problems quickly.

#### Logging

Monitor error logs is important because it helps to identify errors and problems in the system.

#### Metrics

Collection different types of metrics help us to gain business insights and understand the health status of the system. Some of the following metrics are important to monitor:

- Host level metrics: CPU, memory, disk, network
- Aggregate level metrics: Number of requests, number of errors, response time
- Key business metrics: Number of active users, number of new users, number of active sessions, number of new sessions, number of active products, number of new products, number of active orders, number of new orders, number of active payments, number of new payments

#### Automation

When a system get big and complex we need to build tools to automate the deployment and management of the system. This will help us to reduce human errors and increase the efficiency of the system.

### Database scalling

- Vertical scaling
  - Add more CPU and memory to the existing server
  - Greater risk of single point of failure
  - The cost is higher
- Horizontal scaling also known as sharding
  - Add more servers to the pool of resources
  - Better performance
  - Better reliability
  - Better availability
  - The cost is lower

Sharding is a great technique to scale your database. But it comes with some limitations:

- Resharding is a complex process
- Celebrity problem
  - If a user is very popular, it can cause a lot of traffic to a single shard
- Joins are difficult
- Denormalization is required

### Millions of users and beyond

Scaling a system is an iterative process. Iterating on what we have learned in this chapter could get us far. More fine-tuning and new strategies are needed to scale beyond millions of users. For example, you might need to optimize your system and decouple the system to even smaller services. All the techniques learned in this chapter should provide a good foundation to tackle new challenges. To conclude this chapter, we provide a summary of how we scale our system to support millions of users:

- Keep web tier stateless
- Build redundancy at every tier
- Cache data as much as you can
- Support multiple data centers
- Host static assets in CDN
- Scale your data tier by sharding
- Split tiers into individual services
- Monitor your system and use automation tools
