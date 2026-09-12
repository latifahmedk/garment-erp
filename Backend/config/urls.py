from django.contrib import admin
from django.urls import include, path
from apps.accounts.views import RoleListAPIView, EmployeeListAPIView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/accounts/", include("apps.accounts.urls")),
    path("api/users/", include("apps.accounts.user_urls")),
    path("api/roles/", RoleListAPIView.as_view(), name="roles"),
    path("api/employees/", EmployeeListAPIView.as_view(), name="employees"),
    path("api/masters/", include("apps.masters.urls")),
    path("api/products/", include("apps.products.urls")),
    path("api/inventory/", include("apps.inventory.urls")),
    path("api/manufacturing/", include("apps.manufacturing.urls")),
    path("api/customers/", include("apps.customers.urls")),
    path("api/suppliers/", include("apps.suppliers.urls")),
    path("api/purchases/", include("apps.purchases.urls")),
    path("api/sales/", include("apps.sales.urls")),
    path("api/invoices/", include("apps.invoices.urls")),
    path("api/dashboard/", include("apps.dashboard.urls")),
    path("api/payments/", include("apps.payments.urls")),
    path("api/reports/", include("apps.reports.urls")),
]