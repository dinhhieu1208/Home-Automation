import '../../domain/entities/device.dart';
import '../../domain/repositories/device_repository.dart';
import '../datasources/device_remote_data_source.dart';

class DeviceRepositoryImpl implements DeviceRepository {
  final DeviceRemoteDataSource remoteDataSource;
  DeviceRepositoryImpl(this.remoteDataSource);

  @override
  Future<List<Device>> getAllDevices() async {
    return await remoteDataSource.getDevices();
  }
}
