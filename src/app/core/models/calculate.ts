///api/FinancingOption/Calculate
export interface Calculate {
  productId: number;
  subCategoryId: number;
  optionId: number;
  modelYear: number;
  installmentPrice: number;
  installmentMonths: number;
  salaryBankId: number;
  commitments: number;
  monthlySalary: number;
  worksectorId: number;
}
