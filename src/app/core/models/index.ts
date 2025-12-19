/**
 * Barrel file pour exporter tous les models depuis un seul endroit
 * Cela simplifie les imports dans toute l'application
 * 
 * Au lieu de :
 * import { User } from '@core/models/user.model';
 * import { Product } from '@core/models/product.model';
 * import { Cart } from '@core/models/cart.model';
 * 
 * On peut faire :
 * import { User, Product, Cart } from '@core/models';
 */

// User models
export * from './user.model';

// Product models
export * from './product.model';

// Cart models
export * from './cart.model';




// API Response models
export * from './api-response.model';