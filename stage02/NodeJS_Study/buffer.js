var bytes = new Buffer(256);

// 遍历每个字节，写入内容
for (var i = 0; i < bytes.length; i++) {
  bytes[i] = i;
}
