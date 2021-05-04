namespace hr_Domain.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public bool EnableEmailSending { get; set; }
        public string FromEmail { get; set; }
        public string FromEmailPassword { get; set; }
        public string FromEmailDisplayName { get; set; }
        public int FromEmailPort { get; set; }
        public string FromEmailHost { get; set; }
    }
}
