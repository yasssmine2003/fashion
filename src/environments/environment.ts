export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000',
    appName: 'Fashion E-commerce',
    appVersion: '1.0.0',
    
    // JWT Configuration
    jwtTokenKey: 'fashion_auth_token',
    jwtExpirationKey: 'fashion_token_expiration',
    
    // Pagination
    defaultPageSize: 12,
    
    // Currency
    currency: 'TND',
    currencySymbol: 'TND',
    
    // Shipping
    freeShippingThreshold: 200,
    shippingCost: 10,
    
    // Tax
    taxRate: 0.10, // 10%
    
    // Images
    placeholderImage: 'assets/images/placeholder.jpg',
    
    // Social Media
    socialMedia: {
      facebook: 'https://facebook.com/fashionecommerce',
      instagram: 'https://instagram.com/fashionecommerce',
      twitter: 'https://twitter.com/fashionecommerce',
      pinterest: 'https://pinterest.com/fashionecommerce'
    },
    
    // Contact
    contact: {
      email: 'contact@fashionecommerce.com',
      phone: '+216 12 345 678',
      address: 'Avenue Habib Bourguiba, Tunis, Tunisia'
    }
  };