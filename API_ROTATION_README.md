# API Key Rotation System

## Tổng quan

Hệ thống rotation API keys được thiết kế để tối ưu hóa việc sử dụng quota từ RapidAPI bằng cách luân phiên sử dụng nhiều API keys. Điều này giúp:

- **Tăng tổng quota**: Từ 200 requests/tháng lên 600 requests/tháng (với 3 keys)
- **Phân tán tải**: Tránh việc một key bị hết quota quá sớm
- **Tăng độ tin cậy**: Tự động chuyển sang key khác khi key hiện tại gặp vấn đề
- **Session consistency**: Mỗi user session sẽ sử dụng cùng một key để đảm bảo tính nhất quán

## Cách hoạt động

### 1. Key Selection Logic
- **Session-based**: Mỗi user session được gán một API key cụ thể
- **Quota-aware**: Hệ thống ưu tiên key có nhiều quota còn lại nhất
- **Fallback**: Tự động chuyển sang key khác khi key hiện tại hết quota
- **Reset detection**: Tự động phát hiện khi quota được reset

### 2. Rate Limit Handling
- **429 Error**: Khi gặp rate limit, hệ thống sẽ tạm thời vô hiệu hóa key đó và thử key khác
- **Auto-retry**: Tự động thử lại với key khác mà không cần user can thiệp
- **Cooldown**: Key bị rate limit sẽ được reactivate sau 1 phút

### 3. Monitoring
- **Real-time tracking**: Theo dõi quota còn lại của từng key
- **Usage statistics**: Hiển thị tổng quan về việc sử dụng quota
- **Status endpoint**: API endpoint để monitor trạng thái các keys

## Cài đặt

### 1. Environment Variables
Thêm các API keys vào file `.env.local`:

```env
# Primary API Key (required)
RAPIDAPI_KEY_1=your_primary_rapidapi_key_here

# Additional API Keys for rotation (optional but recommended)
RAPIDAPI_KEY_2=your_second_rapidapi_key_here
RAPIDAPI_KEY_3=your_third_rapidapi_key_here

# Legacy support - if you only have one key
# RAPIDAPI_KEY=your_single_rapidapi_key_here
```

### 2. API Keys đã được cấu hình
Hệ thống đã được cấu hình với 3 API keys:
- **Key 1**: `c920e5d0demsh98727e9df4e0e0fp1e7e04jsn96ea9ac03340`
- **Key 2**: `0bb981d8f9msh1e036e36ddd3357p152060jsn67d329eda94c`
- **Key 3**: `55db04b790msh510f2533ff159ecp192b82jsnacb1ccde8dbf`

### 3. Quota Tracking
- **Real-time updates**: Quota được cập nhật từ response headers mỗi lần gọi API
- **Monthly quota**: Sử dụng headers `x-ratelimit-requests-*` cho quota theo tháng
- **Auto-reset detection**: Tự động phát hiện khi quota được reset và cập nhật

### 4. Response Headers được sử dụng
- `x-ratelimit-requests-remaining`: Số lượng requests còn lại (ví dụ: "123")
- `x-ratelimit-requests-limit`: Tổng số requests được phép (ví dụ: "200")
- `x-ratelimit-rapid-free-plans-hard-limit-reset`: Thời gian reset (timestamp Unix)

## Sử dụng

### 1. API Endpoints
Các endpoint hiện tại vẫn hoạt động bình thường:

```
GET /api/extract/page?link=https://facebook.com/example
GET /api/extract/post?link=https://facebook.com/example/post
GET /api/extract/group?link=https://facebook.com/groups/example
```

### 2. Response Headers
Response sẽ bao gồm thông tin về key được sử dụng:

```
X-API-Key-Used: 0
X-Remaining-Quota: 124
X-Total-Quota: 200
```

### 3. Status Monitoring
Kiểm tra trạng thái các API keys:

```
GET /api/status
```

Response:
```json
{
  "keys": [
    {
      "index": 0,
      "remaining": 124,
      "limit": 200,
      "isActive": true,
      "lastUsed": 1703123456789,
      "resetTime": 0
    }
  ],
  "summary": {
    "totalRemaining": 124,
    "totalLimit": 200,
    "activeKeys": 1,
    "totalKeys": 1,
    "usagePercentage": "38.00"
  },
  "timestamp": "2023-12-21T10:30:56.789Z"
}
```

## Admin Dashboard

### Truy cập Admin Dashboard

Admin dashboard được đặt tại `/trueblue` và chỉ dành cho quản trị viên:

1. **Không có bảo vệ** (development): Truy cập trực tiếp `/trueblue`
2. **Có bảo vệ** (production): Truy cập `/trueblue?token=your_admin_token`

### Cấu hình Admin Token

Thêm vào file `.env.local`:

```env
ADMIN_TOKEN=your_secret_admin_token_here
```

### Tính năng Admin Dashboard

- **Real-time API Status**: Hiển thị trạng thái tất cả API keys
- **Quota Monitoring**: Theo dõi quota còn lại và usage percentage
- **Quick Testing**: Test các API endpoints
- **System Information**: Thông tin về environment và cấu hình

### Sử dụng Component ApiStatus

Component `ApiStatus` chỉ được sử dụng trong admin dashboard:

```tsx
import { ApiStatus } from '@/components/api-status'

export default function AdminPage() {
  return (
    <div>
      <h1>API Management</h1>
      <ApiStatus />
    </div>
  )
}
```

## Tính năng nâng cao

### 1. Session Management
- Hệ thống tự động tạo session ID dựa trên user agent và IP
- Mỗi session sẽ sử dụng cùng một key để đảm bảo consistency
- Session có thể được tạo từ cookie hoặc fingerprint

### 2. Cache Optimization
- In-memory cache với thời gian 5 phút
- Tự động cleanup khi cache vượt quá 100 entries
- Cache key bao gồm loại API và URL

### 3. Error Handling
- Graceful degradation khi không có key nào khả dụng
- Detailed error messages với retry information
- Automatic fallback khi gặp rate limit

## Monitoring và Debugging

### 1. Logs
Hệ thống sẽ log các thông tin quan trọng:
- Key được sử dụng cho mỗi request
- Rate limit events
- Quota updates
- Fallback attempts

### 2. Metrics
- Tổng số requests per key
- Quota usage percentage
- Error rates per key
- Response times

## Troubleshooting

### 1. "No available API keys" Error
- Kiểm tra xem các API keys đã được cấu hình đúng chưa
- Đảm bảo ít nhất một key có quota còn lại
- Kiểm tra thời gian reset của các keys

### 2. High Error Rate
- Kiểm tra trạng thái của từng key qua `/api/status`
- Xem logs để tìm key nào đang gặp vấn đề
- Cân nhắc thêm key mới hoặc thay thế key có vấn đề

### 3. Performance Issues
- Kiểm tra cache hit rate
- Monitor response times của từng key
- Cân nhắc tăng timeout hoặc giảm concurrent requests

## Best Practices

1. **Key Distribution**: Phân bố keys đều giữa các tài khoản
2. **Monitoring**: Thường xuyên kiểm tra trạng thái qua `/api/status`
3. **Backup Keys**: Luôn có ít nhất 2 keys để đảm bảo redundancy
4. **Quota Planning**: Theo dõi usage pattern để tối ưu hóa việc sử dụng quota
5. **Error Handling**: Implement proper error handling ở frontend cho các trường hợp hết quota

## Migration từ Single Key

Nếu bạn đang sử dụng single key system:

1. Backup file `lib/api-utils.ts` hiện tại
2. Thay thế bằng version mới
3. Cấu hình các API keys trong `.env.local`
4. Test các endpoint để đảm bảo hoạt động bình thường
5. Monitor trạng thái qua `/api/status` 