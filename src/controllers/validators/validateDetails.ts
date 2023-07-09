class RegistrationValidator {
  validateRegistration(restaurantName: string, contactName: string, pinCode: string, address: string, contactNumber: string, avgTransactions: string): boolean {
 
    if (!restaurantName || !contactName || !pinCode || !address || !contactNumber || !avgTransactions) {
      return false;
    }
  

    return true;
  }
}

export default RegistrationValidator;
