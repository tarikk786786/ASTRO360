from locust import HttpUser, task, between

class AstroUser(HttpUser):
    wait_time = between(1, 3)

    @task(3)
    def view_dashboard(self):
        self.client.get("/")

    @task(1)
    def view_panchang(self):
        self.client.get("/?tab=panchang-deities")
